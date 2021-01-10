module.exports = {
  definition: `
  input ContactFormInputWithCaptcha {
    email: String!
    recaptcha: String!
    content: String
    mobile: String
    subject: String
  }

  input createContactFormInputWithCaptcha {
    data: ContactFormInputWithCaptcha
  }

  type createContactFormPayloadWithError {
    contactForm: ContactForm
    statusCode: Int
    error: String
  }
  `,
  mutation:`createContactFormWithCaptcha(input: createContactFormInputWithCaptcha): createContactFormPayloadWithError`,
  resolver: {
    Mutation: {
      createContactForm: false,
      createContactFormWithCaptcha: {
        resolver: 'application::contact-form.contact-form.create'
      }
    }
  }
};
