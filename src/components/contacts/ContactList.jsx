import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'components/redux/operations';
import { toast } from 'react-toastify';
import { selectContacts, selectContactsFilter } from './../redux/selectors';
import { IoPersonOutline, IoClose } from 'react-icons/io5';
import {
  ContactsList,
  ContactItem,
  ContactIcon,
  ContactText,
  ContactDelete,
} from './ContactList.styles';
import { getRandomHexColor } from '../utils/getColorsFn';


export function ContactList() {
  const contacts = useSelector(selectContacts);

  const filterValue = useSelector(selectContactsFilter).toLowerCase();


  const dispatch = useDispatch();

  const handleDelete = evt => {
    dispatch(deleteContact(evt.currentTarget.id));

   
    toast.info(`This contact is delited from your phonebook!`);
  };

  const getVisibilityContacts = () => {
    if (!filterValue || filterValue === '') {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  const visibilityContacts = getVisibilityContacts();

  return (
    <ContactsList>
      {visibilityContacts.map(contact => (
        <ContactItem key={contact.id} rgb={getRandomHexColor()}>
          <ContactIcon>
            <IoPersonOutline />
          </ContactIcon>
          <ContactText rgb={getRandomHexColor()}>
            {contact.name}: <span>{contact.phone}</span>
          </ContactText>
          <ContactDelete type="button" id={contact.id} onClick={handleDelete}>
            <IoClose />
            {/* Delete */}
          </ContactDelete>
        </ContactItem>
      ))}
    </ContactsList>
  );
}
