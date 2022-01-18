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
      if (!contact) {
        throw new Error('Contact not found');
      }
      console.log(contact);
      break;
    case 'addContact':
      const newContact = await contactOperations.addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'removeContact':
      const removeContact = await contactOperations.removeContact(id);
      if (!removeContact) {
        throw new Error('Contact not found');
      }
      console.log(removeContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
      break;
  }
};
invokeAction(argv);
