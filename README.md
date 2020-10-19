# Node Clone AWS S3 Bucket

## Configuration
The project requires the AWS S3 information to access data and download files from the same. So in the under **_config/test.json_**, please add your AWS S3 information to access buckets.

## Run

```bash
npm run start
```

## Lint (ES-lint)
```bash
npm run lint
npm run fix-lint
```

#### Note
> The file path of the local_S3 can be edited by changing the **_TARGET_DIR_** inside **_/lib/helpers/file_path.js_**.


## to do list
- Writing unit/integration tests.


