import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    coding: "Coding",
    documentation: "Documentation",
    mockups: "Mockups",
    research: "Research",
    testing: "Testing",

    codingDescription: "I translate the desired interfaces from mockups/documentation into code.",
    documentationDescription: "I write down the expected or required behaviour of the program. This is often abstracted into an API.",
    mockupsDescription: "Mockups guide the code. They are the first concrete product in my development process.",
    researchDescription: "There’s always a shiny new tool in the software development world. I look into which libraries/frameworks would be most suitable for the task at hand.",
    testingDescription: "I Make sure that all reasonable “what if“ scenarios are tested for or against. ",
  },
});

export default strings;
