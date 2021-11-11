import React from 'react';
import App from 'src/components/app';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

jest.mock('src/utils', () => ({
  __esModule: true,
  default: () => 'X-CSRF-TOKEN',
}));

const API_RESPONSES = {
  searchResults: [
    { id: 1, text: 'hola' },
    { id: 2, text: 'holaaa' },
    { id: 3, text: 'Hola Amigo' },
  ],
  newWord: { id: 4, text: 'Hello' },
};

const server = setupServer(
  rest.get('/api/words', (req, res, ctx) => {
    return res(ctx.json(API_RESPONSES.searchResults));
  }),
  rest.delete('/api/words/1', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.post('/api/words', (req, res, ctx) => {
    return res(ctx.json(API_RESPONSES.newWord));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  describe('default state', () => {
    it('displays search input and disabled "Submit" and "Clear" buttons', () => {
      render(<App />);

      expect(
        screen.getByPlaceholderText('Enter word for search...')
      ).toBeInTheDocument();

      expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    });
  });

  describe('user enters search value and triggers search', () => {
    describe('search returns some results', () => {
      let searchInput;

      beforeEach(() => {
        render(<App />);

        searchInput = screen.getByPlaceholderText('Enter word for search...');

        userEvent.type(searchInput, 'Hola');
        userEvent.click(screen.getByRole('button', { name: /submit/i } ));
      });

      it('displays unordered list with search results', async () => {
        const list = await screen.findByRole('list');

        API_RESPONSES.searchResults.forEach(({ text }) => {
          expect(list).toHaveTextContent(text);
        });
      });

      it('displays "Delete" icon for each word', async () => {
        const deleteIcons = await screen.findAllByTestId('delete-icon');

        expect(deleteIcons.length).toBe(API_RESPONSES.searchResults.length);
      });

      it('disables "Submit" button until search value is changed', async () => {
        await waitFor(() => screen.getAllByRole('listitem'));

        expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();

        userEvent.type(searchInput, 'Hol');

        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
      });

      describe('upon "Clear" btn click', () => {
        it('clears search input and search results', async () => {
          await waitFor(() => screen.getAllByRole('listitem'));

          userEvent.click(screen.getByRole('button', { name: /clear/i } ));

          expect(searchInput).toHaveValue('');
          expect(screen.queryAllByRole('listitem')).toEqual([]);
        });
      });

      describe('upon "Delete" icon click', () => {
        describe('deleting was successful', () => {
          it('removes word from search results and displays success message', async () => {
            await waitFor(() => screen.getAllByRole('listitem'));

            const firstWord = screen.queryByTestId('word-1');
            const firstWordDeleteIcon = within(firstWord).getByTestId('delete-icon');

            userEvent.click(firstWordDeleteIcon);

            await waitFor(() => {
              expect(screen.queryByTestId('word-1')).toBeNull();
            });

            expect(
              await screen.findByRole('alert')
            ).toHaveTextContent('Word was successfully deleted!');
          });
        });

        describe('deleting was not successful', () => {
          beforeEach(() => {
            server.use(
              rest.delete('/api/words/1', (req, res, ctx) => {
                return res(ctx.status(500));
              }),
            );
          });

          it('does not remove word from search results and displays error message', async () => {
            await waitFor(() => screen.getAllByRole('listitem'));

            const firstWord = screen.queryByTestId('word-1');
            const firstWordDeleteIcon = within(firstWord).getByTestId('delete-icon');

            userEvent.click(firstWordDeleteIcon);

            await waitFor(() => screen.getByTestId('word-1'));

            expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong!');
          });
        });
      });
    });

    describe('search does not return any results', () => {
      let searchInput;

      beforeEach(() => {
        server.use(
          rest.get('/api/words', (req, res, ctx) => {
            return res(ctx.json([]));
          }),
        );

        render(<App />);

        searchInput = screen.getByPlaceholderText('Enter word for search...');

        userEvent.type(searchInput, 'Hello');
        userEvent.click(screen.getByRole('button', { name: /submit/i } ));
      });

      it('displays expected message with "Add Word" button', async () => {
        expect(
          await screen.findByTestId('no-search-results')
        ).toHaveTextContent('No search results for: Hello');

        expect(screen.getByRole('button', { name: /add word/i })).toBeInTheDocument();
      });

      describe('upon "Add Word" btn click', () => {
        describe('creating was successful', () => {
          it('creates word, adds it to search results and displays success message', async () => {
            const addWordBtn = await screen.findByRole('button', { name: /add word/i });

            userEvent.click(addWordBtn);

            await waitFor(() => {
              const newWord = screen.getByTestId(/word/);

              expect(newWord).toBeInTheDocument();
              expect(newWord).toHaveTextContent(API_RESPONSES.newWord.text);
            });

            expect(
              await screen.findByRole('alert')
            ).toHaveTextContent('Word was successfully created!');
          });
        });

        describe('creating was not successful', () => {
          beforeEach(() => {
            server.use(
              rest.post('/api/words', (req, res, ctx) => {
                return res(ctx.status(500));
              }),
            );
          });

          it('does not create word and displays error message', async () => {
            const addWordBtn = await screen.findByRole('button', { name: /add word/i });

            userEvent.click(addWordBtn);

            await waitFor(() => {
              const newWord = screen.queryByTestId('word-4');

              expect(newWord).toBeNull();
            });

            expect(
              await screen.findByRole('alert')
            ).toHaveTextContent('Something went wrong!');
          });
        });
      });
    });
  });
});
