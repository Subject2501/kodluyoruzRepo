const authors = [
    {
      id: "1",
      name: "Albert",
      surname: "Camus",
      age: 50
      
    },
    {
        id: "2",
        name: "Mehmet",
        surname: "Seven",
        age: 20
    }
  ];
  
  const books = [
    {
      id: "1",
      title: "Deneme Kitap 1",
      author_id:"1",
      score: 6.9,
      isPublished: true,
    },
    {
        id: "2",
        title: "Deneme Kitap 2",
        author_id:"1",
        score: 8.0,
        isPublished: true,
      }
  ];


module.exports = {
    authors,
    books
}