
const url = 'http://localhost:3000/posts'

export async function fetchPosts() {
    const response = await fetch(url)
    return response.json()
}

export async function fetchPost(id){
    const response = await fetch(`${url}/${id}`)
    return response.json()
}

export async function createPost(post){
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    return response.json()
}

export async function updatePost(post){
    const response = await fetch(`${url}/${post.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export async function deletePost(id){
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE"
    });
    return response.json()
}
