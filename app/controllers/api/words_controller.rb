module Api
  class WordsController < ApplicationController
    def index
      @words = Word.where('text ILIKE ?', "#{params[:search]}%")

      render json: @words
    end

    def create
      @word = Word.new(word_params)

      if @word.save
        render json: @word, status: :created
      else
        render json: @word.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @word = Word.find(params[:id])
      @word.destroy

      head :no_content
    end

    private

    def word_params
      params.require(:word).permit(:text)
    end
  end
end
