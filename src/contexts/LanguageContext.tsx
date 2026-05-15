import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'pl' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.yacht': 'The Yacht',
    'nav.dayTrips': 'Day Trips',
    'nav.charters': 'Charters',
    'nav.destinations': 'Destinations',
    'nav.gallery': 'Gallery',
    'nav.inquire': 'Inquire',
    'nav.inquireNow': 'Inquire Now',
    'nav.cuisine': 'Cuisine',
    'hero.motto': 'Where classic lines meet the modern sea.',
    'hero.model': 'Admiral 27m · Sopot · Gdańsk · Gdynia',
    'cuisine.title': 'Baltic Culinary',
    'cuisine.subtitle': 'Artistry.',
    'cuisine.description': 'A voyage of taste featuring the freshest local ingredients from the Baltic Sea and Kashubian forests, expertly prepared by our onboard chef.',
    'cuisine.barTitle': 'The Deck Bar',
    'cuisine.barDescription': 'Sip on handcrafted cocktails inspired by the sea, served with a view of the Sopot skyline.',
    'cuisine.localFlavors': 'Local Flavors',
    'cuisine.seafoodTitle': 'Baltic Treasures',
    'cuisine.seafoodDesc': 'Wild turbot, Baltic salmon, and hand-dived scallops served with seasonal infusions.',
    'cuisine.kashubianTitle': 'Kashubian Roots',
    'cuisine.kashubianDesc': 'Traditional smoked delicacies and locally sourced forest mushrooms with a modern gourmet twist.',
    'cuisine.craftTitle': 'Craft Cocktails',
    'cuisine.craftDesc': 'Signature spirits and botanical syrups mixed with precision by our stewardess.',
  },
  pl: {
    'nav.yacht': 'Jacht',
    'nav.dayTrips': 'Rejsy Dniowe',
    'nav.charters': 'Czartery',
    'nav.destinations': 'Kierunki',
    'nav.gallery': 'Galeria',
    'nav.inquire': 'Zapytaj',
    'nav.inquireNow': 'Zapytaj Teraz',
    'nav.cuisine': 'Kuchnia',
    'hero.motto': 'Gdzie klasyczne linie spotykają nowoczesne morze.',
    'hero.model': 'Admiral 27m · Sopot · Gdańsk · Gdynia',
    'cuisine.title': 'Bałtyckie Kulinaria',
    'cuisine.subtitle': 'Sztuka.',
    'cuisine.description': 'Podróż smaku z najświeższymi lokalnymi składnikami z Morza Bałtyckiego i kaszubskich lasów, fachowo przygotowanymi przez naszego szefa kuchni.',
    'cuisine.barTitle': 'Bar na Pokładzie',
    'cuisine.barDescription': 'Sącz ręcznie robione koktajle inspirowane morzem, serwowane z widokiem na panoramę Sopotu.',
    'cuisine.localFlavors': 'Lokalne Smaki',
    'cuisine.seafoodTitle': 'Bałtyckie Skarby',
    'cuisine.seafoodDesc': 'Dziki turbot, łosoś bałtycki i małże serwowane z sezonowymi dodatkami.',
    'cuisine.kashubianTitle': 'Kaszubskie Korzenie',
    'cuisine.kashubianDesc': 'Tradycyjne wędzone przysmaki i lokalnie zbierane leśne grzyby w nowoczesnym wydaniu gourmet.',
    'cuisine.craftTitle': 'Autorskie Koktajle',
    'cuisine.craftDesc': 'Wyjątkowe alkohole i botaniczne syropy mieszane z precyzją przez naszą stewardessę.',
  },
  de: {
    'nav.yacht': 'Die Yacht',
    'nav.dayTrips': 'Tagestouren',
    'nav.charters': 'Charter',
    'nav.destinations': 'Ziele',
    'nav.gallery': 'Galerie',
    'nav.inquire': 'Anfragen',
    'nav.inquireNow': 'Jetzt Anfragen',
    'nav.cuisine': 'Kulinarik',
    'hero.motto': 'Wo klassische Linien auf das moderne Meer treffen.',
    'hero.model': 'Admiral 27m · Sopot · Gdańsk · Gdynia',
    'cuisine.title': 'Ostsee Kulinarik',
    'cuisine.subtitle': 'Kunst.',
    'cuisine.description': 'Eine Geschmacksreise mit den frischesten lokalen Zutaten aus der Ostsee und kashubischen Wäldern, fachmännisch zubereitet von unserem Bordkoch.',
    'cuisine.barTitle': 'Die Deck-Bar',
    'cuisine.barDescription': 'Genießen Sie handgefertigte Cocktails, inspiriert vom Meer, serviert mit Blick auf die Skyline von Sopot.',
    'cuisine.localFlavors': 'Lokale Aromen',
    'cuisine.seafoodTitle': 'Ostsee-Schätze',
    'cuisine.seafoodDesc': 'Wilder Steinbutt, Ostseelachs und Jakobsmuscheln, serviert mit saisonalen Aufgüssen.',
    'cuisine.kashubianTitle': 'Kashubische Wurzeln',
    'cuisine.kashubianDesc': 'Traditionelle geräucherte Köstlichkeiten und lokal bezogene Waldpilze mit einem modernen Gourmet-Twist.',
    'cuisine.craftTitle': 'Craft-Cocktails',
    'cuisine.craftDesc': 'Signature-Spirituosen und botanische Sirupe, präzise gemixt von unserer Stewardess.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
