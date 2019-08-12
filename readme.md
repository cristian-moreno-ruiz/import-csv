# IMPORT CSV FILE

This app exposes a POST route to import a csv file with following parameters:
file: file to be imported
provider: String 

## HOW IT WORKS
1. run 'npm install' to install dependencies
2. run 'npm start' and server will start listenning at localhost:3000. The mongodb endpoint will be displayed in the console
3. upload.html can be used to send the files to the API
4. Some example csv files can be found in 'test_files' directory

Note: There are three configuration files for providers: 
- 'example' provider uploads csv with the exact column layout that we are expecting 
- 'ford, adds some columns at the end
- 'nissan' removes one column and adds another one

## PROJECT STRUCTURE

### server.js
Entry point of the project containing the code to create mongodb server in memory, initialize mongodb client and start express server using multer middleware to process file uploads.

### config
Directory that contains a json with the comnfiguration file of each provider. This config json contains an array 'columns' with strings ordered as the CSV file needs to ve imported.

### models
Directory that contains database models and configuration file to access mongodb database.

### services
Directory with services used by the server:
- import-csv
    creates a stream to process a CSV file, creates object for every row, and once whole file has been processed, inserts data in batch to the database, in order to improve efficiency and reduce number of database connections.