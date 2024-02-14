import React from 'react';
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchPosts, deletePost} from "../api/posts.jsx";
import AddPost from "../components/AddPost.jsx";

const PostLists = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        data: posts,
        error
    } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    })

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts']});
        }
    });

    const handleDelete = (id) => {
        deletePostMutation.mutate(id)
    }

    if (isLoading) return "loading...";
    if (isError) return `Error: ${error.message}`;

    return (
        <div>
            <h2>Posts</h2>
            <AddPost />
            {posts.map((post) => (
                <div key={post.id}>
                    <h4
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/post/${post.id}`)}
                    >
                        {post.id}- {post.title}
                    </h4>
                    <button onClick={() => navigate(`/post/${post.id}/edit`)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostLists;
