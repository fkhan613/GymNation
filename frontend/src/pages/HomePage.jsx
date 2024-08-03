import { useEffect } from "react";

const HomePage = () => {
  //get all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("accessToken");
        console.log("Token:", token);

        //fetch posts
        const response = await fetch("http://localhost:3500/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        //log the entire response
        console.log("Response:", response);

        //check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        //parse the response
        const responseData = await response.json();

        //log the response data
        console.log("Response Data:", responseData);
      } catch (error) {
        //log any errors
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
