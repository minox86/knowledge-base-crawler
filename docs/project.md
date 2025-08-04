# Knowledge Base Crawler
The Knowledge Base Crawler is a tool that enables an organization to crawl their knowledge base from different sources and store the data in a vector database. 

## Features

### Crawl
The crawler is able to crawl the knowledge base from different sources such as:
- Websites, with or without authentication, such as:
  - Backstage
  - Confluence
  - Jira
  - etc.
- Documents stored on different places, such as:
  - Google Drive
  - Microsoft OneDrive
  - Amazon S3
  - Azure Blob Storage
  - etc.
- Meeting notes of differente communication platforms, such as:
  - Microsoft Teams
  - Slack
  - Discord
  - etc.

It is able to search, gather, collect and store the data. It is also able to update the data when updated or periodically, depending on the source.

### Store
The crawler is able to store the data in a vector database. The vector database is used to store the data in a way that allows for efficient retrieval of the data, in particular semantic search.

It is able to store the date in different vector databases, such as:
- Chroma
- Qdrant
- Pinecone
- etc.