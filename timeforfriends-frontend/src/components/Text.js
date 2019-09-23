import { useContext } from "react";
import { Store } from "../Store";

const Text = () => {
  const { state } = useContext(Store);
  const strings = {
    en: {
      navigation: {
        home: "Home",
        friends: "Friends",
        addFriend: "Add friend",
        toggle: "Toggle language"
      },
      personForm: {
        notificationAdded: "was added to your friend list",
        errorEmpty: "must not be empty",
        errorPhoneInvalid: "Invalid phone number",
        errorEmailInvalid: "Invalid email",
        formFirstName: "First name",
        formLastName: "Last name",
        formPhoneNumber: "Phone number",
        formEmail: "Email",
        formCountry: "Country",
        formCity: "City",
        button: "Submit"
      }
    },
    sv: {
      navigation: {
        home: "Hem",
        friends: "Vänner",
        addFriend: "Lägg till vän",
        toggle: "Ändra språk"
      },
      personForm: {
        notificationAdded: "är tillagd till din vänlista",
        errorEmpty: "får inte vara tom",
        errorPhoneInvalid: "Ogiltigt telefonnummer",
        errorEmailInvalid: "Ogiltig email",
        formFirstName: "Förnamn",
        formLastName: "Efternamn",
        formPhoneNumber: "Telefonnummer",
        formEmail: "Email",
        formCountry: "Land",
        formCity: "Stad",
        button: "Skicka"
      }
    }
  };
  return strings[state.language.code];
};

export default Text;
