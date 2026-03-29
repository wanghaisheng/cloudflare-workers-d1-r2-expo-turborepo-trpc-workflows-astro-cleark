Data Use & Privacy Overview
Last updated Oct 20, 2025
If you have any questions or feedback, please email us at hi@cursor.com. And for more information about how we collect, use, disclose, and process your personal data, see our full Privacy Policy.

Here’s how your data is handled based on the privacy settings you choose in Cursor:

If you enable “Privacy Mode” in Cursor’s settings: zero data retention will be enabled for our model providers. Cursor may store some code data to provide extra features. None of your code will ever be trained on by us or any third-party.

If you choose to turn off “Privacy Mode”: we may use and store codebase data, prompts, editor actions, code snippets, and other code data and actions to improve our AI features and train our models. Prompts and limited telemetry may also be shared with model providers when you explicitly select their models. Some of our inference providers, including Baseten, Together AI, and Fireworks, may temporarily access and store model inputs and outputs to improve our inference performance; this data is deleted after use. Prompts and limited telemetry may also be shared with model providers when you explicitly select their models.[1] See our security page here for more details on how our model providers use data when Privacy Mode is off.

If you are on “Privacy Mode (Legacy)”: zero data retention will be enabled, and none of your code will ever be stored or trained on by us or any third-party.

Other notes:

Even if you use your API key, your requests will still go through our backend! That's where we do our final prompt building.

If you choose to index your codebase, Cursor will upload your codebase in small chunks to our server to compute embeddings, but all plaintext code for computing embeddings ceases to exist after the life of the request. The embeddings and metadata about your codebase (hashes, file names) may be stored in our database.

We temporarily cache file contents on our servers to reduce latency and network usage. The files are encrypted using unique client-generated keys, and these encryption keys only exist on our servers for the duration of a request. All cached file contents are temporary, never permanently stored, and never used as training data when privacy mode is enabled.

[1]: This data will not be shared with model providers if your account was created before Oct 15, 2025.