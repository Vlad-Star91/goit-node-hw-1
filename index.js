// const yargs = require('yargs');
// const { hideBin } = require('yargs/helpers');
const { program } = require('commander');
program
  .option('-a, --action <type>', 'contacts action')
  .option('--id, <type>', 'contacts id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');
program.parse(process.argv);
const argv = program.opts();
const contactOperations = require('./contacts.js');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactOperations.listContacts();
      console.log(allContacts);
      break;
    case 'getById':
      const contact = await contactOperations.getContactById(id);
      console.log(contact);
      break;
    case 'addContact':
      const newContact = await contactOperations.addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'removeContact':
      const removeContact = await contactOperations.removeContact(id);
      console.log(removeContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
      break;
  }
};

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);

invokeAction(argv);
// invokeAction({ action: 'list' });
// invokeAction({ action: 'getById', id: '8' });
// invokeAction({
//   action: 'addContact',
//   name: 'Vladyslav',
//   email: 'sdfsdf@mail.com',
//   phone: '2343242',
// });
// invokeAction({
//   action: 'removeContact',
//   id: 'a8ba498e-26a2-4b86-9020-7f7b6199673d',
// });
