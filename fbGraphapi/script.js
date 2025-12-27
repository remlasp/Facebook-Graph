// Facebook Page ID
// This is the numeric ID of the Facebook Page you want to fetch posts from
const pageId = "939741955885293";

// Page Access Token
// IMPORTANT: This must be a PAGE access token (from /me/accounts)
// NOT a user access token
const accessToken = "EAAbkcodBJEcBQeW4aDMs05O9WwX1euhEKRmm2oqW1K7B3IEE5eutD15XyIZCaMZCHSHWv0J7ItIr4QI20G7FJtzkr25hD3DKZBPFlU40vxRzHv8LOLZCRfuR1LMaQZBhDCdUdvUbNZB0Mvrx40zc8BabUsliBoM8FHgTUcF6nAdCE4LZBItEs0AaKVCQB1TKDxkSfITUjgvf6UNRCZAVCPKA2cxbz9kUowNQUBHhmeIvueIZD";
  
// Get the container where posts will be displayed
const postsDiv = document.getElementById("posts");

// Async function to fetch Facebook Page posts
async function fetchFacebookPosts() {
  try {
    // 1. Send request to Facebook Graph API
    // v21.0 = latest Graph API version
    // fields=message,created_time specifies the data we want from each post
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}/posts?fields=message,created_time&access_token=${accessToken}`
    );

    // Convert the response to JSON
    const data = await response.json();

    // 2. Check if Facebook returned an error
    // Facebook errors come inside data.error
    if (data.error) {
      console.error("Facebook API Error:", data.error.message);
      postsDiv.textContent = `Error: ${data.error.message}`;
      return; // Stop execution if error exists
    }

    // Clear previous posts before rendering new ones
    postsDiv.innerHTML = "";

    // 3. Check if there are no posts returned
    if (!data.data || data.data.length === 0) {
      postsDiv.textContent = "No posts found for this page.";
      return;
    }

    // 4. Loop through each post returned by the API
    data.data.forEach(post => {

      // Create a div for each post
      const postDiv = document.createElement("div");
      postDiv.className = "post";

      // Basic styling for readability
      postDiv.style.borderBottom = "1px solid #ccc";
      postDiv.style.marginBottom = "10px";
      postDiv.style.paddingBottom = "10px";

      // If post has no message, display fallback text
      const message = post.message || "*(No text content)*";

      // Convert Facebook timestamp into readable date
      const date = new Date(post.created_time).toLocaleString();

      // Insert post content into div
      postDiv.innerHTML = `
        <p><strong>Message:</strong> ${message}</p>
        <p class="post-date" style="font-size: 0.8em; color: gray;">
          ${date}
        </p>
      `;

      // Append the post to the main container
      postsDiv.appendChild(postDiv);
    });

  } catch (error) {
    // 5. Catch network or fetch-related errors
    console.error("Network Error:", error);
    postsDiv.textContent = "Failed to connect to the API.";
  }
}

// Call the function to fetch and display posts
fetchFacebookPosts();
