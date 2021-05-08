const postContainer = document.querySelector('.post-container');
const filter = document.querySelector(".filter");
let limit = 3;
let page = 1;

function showLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.add('show');
    setTimeout(() => {
        loader.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 200)
    }, 1000)

}

async function getPosts() {
    let res = await
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json()
    return data;
}

async function showPosts() {
    let data = await getPosts();
    data.forEach(element => {
        let post = document.createElement("div");
        post.classList.add('post');
        post.innerHTML = `
            <div class="number">${element.id}</div>
            <div class="post-info">
                <div class="post-title">
                    ${element.title}
                </div>
                <div class="post-body">
                    ${element.body}
                </div>      
            </div>`;
        postContainer.appendChild(post);
    });
    console.log(data);
}
showPosts();

function filterPost(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");
    console.log(posts)
    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        console.log("scroolled")
        showLoader();
    }
})


filter.addEventListener('input', filterPost)