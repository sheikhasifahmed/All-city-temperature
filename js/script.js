fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => showPostTitles(data));

function showPostTitles(data) {
  const postTitles = document.getElementById("post-titles");
  data.forEach((post) => {
    const li = document.createElement("li");
    li.innerText = post.title;
    li.setAttribute("onclick", `showPost('${post.id}')`);
    postTitles.append(li);
  });
}

const headline = document.getElementById("headline");
function showPost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
    .then((post) => (headline.innerText = post.body));
}

// function showPost(postId) {
//   const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
//   console.log(url);
// }
