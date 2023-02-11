import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "./db/contacts.json");

const readFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const listContacts = async () => {
  console.table(await readFile());
};

export const getContactsById = async (contactId) => {
  try {
    const data = await readFile();
    const contact = data.filter(({ id }) => id === contactId);

    console.table(contact);
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await readFile();

    const newContacts = contacts.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    listContacts();
  } catch (error) {
    console.log(error);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await readFile();

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, { name, email, phone, id: nanoid() }])
    );

    listContacts();
  } catch (error) {
    console.log(error);
  }
};
