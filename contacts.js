const { strictEqual } = require('assert');
const { all } = require('express/lib/application');
const fs = require('fs/promises');
const path = require('path');
const { stringify } = require('querystring');
const { v4 } = require('uuid');

const filePath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const allContacts = JSON.parse(data);
  console.log(allContacts);
  return allContacts;
};
const getContactById = async id => {
  const allContacts = await listContacts();
  const result = allContacts.find(item => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};
const addContact = async (name, email, phone) => {
  const data = { id: v4(), name, email, phone };
  const allContacts = await listContacts();
  allContacts.push(data);
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2));
  return data;
};

const removeContact = async id => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(idx, 1);
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2));
  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
