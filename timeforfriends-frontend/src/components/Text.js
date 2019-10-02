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
        formEnterLocation: "City and country",
        formGetLocationButton: "Get location",
        formSuggestedLocation: "Suggested location:",
        button: "Submit"
      },
      suggest: {
        valid: "Valid Address. Location is ",
        invalid: "Invalid. The address is not recognized."
      },
      filter: {
        name: "Name filter",
        timeZone: "Time zone filter"
      },
      sort: {
        sortBy: "Sort by:",
        name: "Name",
        timeZone: "Time zone"
      },
      friend: {
        yes: "yes",
        no: "no",
        deleteFriend: "Delete friend",
        areYouSure: "Are you sure you want to delete friend "
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
        formEnterLocation: "Stad och land",
        formGetLocationButton: "Hämta plats",
        formSuggestedLocation: "Förslagen adress:",
        button: "Skicka"
      },
      suggest: {
        valid: "Giltig adress. Platsen är ",
        invalid: "Ogiltig. Adressen kan inte hittas."
      },
      filter: {
        name: "Filtrera på namn",
        timeZone: "Filtrera på tidszon"
      },
      sort: {
        sortBy: "Sortera efter:",
        name: "Namn",
        timeZone: "Tidszon"
      },
      friend: {
        yes: "ja",
        no: "nej",
        deleteFriend: "Ta bort vän",
        areYouSure: "Är du säkert på att du vill ta bort "
      }
    },
    kl: {
      navigation: {
        home: "juH",
        friends: "jup",
        addFriend: "jup chel",
        toggle: "Hol choH"
      },
      personForm: {
        notificationAdded: "chel jup tetlh",
        errorEmpty: "ghob'e' wej chIm",
        errorPhoneInvalid: "ngebmo' yIper",
        errorEmailInvalid: "QumpIn rar ngeb",
        formFirstName: "wa'DIch pong",
        formLastName: "wa'Hu' pong",
        formPhoneNumber: "ghogh HablI' mI'",
        formEmail: "rar QumpIn",
        formCountry: "Hatlh",
        formCity: "veng",
        formEnterLocation: "veng Sep je",
        formGetLocationButton: "Daq Suq",
        formSuggestedLocation: "chup Daq:",
        button: "Qochbe'"
      },
      suggest: {
        valid: "lu' SoQ. Daq ",
        invalid: "ngeb. wej ghov SoQ."
      },
      filter: {
        name: "Pong vItu'",
        timeZone: "poH mIch vItu'"
      },
      sort: {
        sortBy: "Segh:",
        name: "pong",
        timeZone: "poH mIch"
      },
      friend: {
        yes: "HIja'",
        no: "Qo'",
        deleteFriend: "jup teq",
        areYouSure: "be jup teq DaneH'a' "
      }
    }
  };
  return strings[state.language.code];
};

export default Text;
