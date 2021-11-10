# Run rails db:seed to populate vocabulary with the words from dictionary.txt file
# Note: seed task lasts around 20-30 seconds

Word.delete_all

prepared_words = File.open(Rails.root.join('db', 'seeds', 'dictionary.txt')) do |f|
  f.reduce([]) do |acc, line|
    acc << { text: line.split("\n")[0], created_at: Time.now, updated_at: Time.now }
  end
end

Word.insert_all(prepared_words)
