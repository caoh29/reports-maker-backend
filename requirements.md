1. Landing page:

The landing page must be beautiful in terms of UX and also provide like a table or dropdown where user can select which
type of report he wants, could be on of the already pre made report or a custom.
It should redirect user to create-report/custom or create-report/employment-letter

2. create-report/[premade-report] page:

- in a mobile first design it will only appear the form with the inputs to filled according to that report and a submit btn.
- in a desktop the screen will be divided in two columns, left column is the form with submit btn and right column is the template report.
  So user knows how it will look but just with placeholder for the inputs he is filling.

  - SSR PATH: After user submits it will be redirected to /pdf/[premade-report]/[id] page where user will only see generated pdf and able to download it.
  - CSR PATH: After user submits it will be redirected to /download page where user will see a prompt saying that everything was successfull and a download button.

3. create-report/custom page:

it will look like create-report/[premade-report] page mobile version since we dont know what user is going to put but now the inputs are different.
Instead of that user will have access to the entire body of the document so it will be a textarea.

For this first MVP there is NOT auth included or needed at the moment.
