export type ContactContent = {
  title: string;
  subtitle: string;

  info: {
    title: string;
    email: {
      label: string;
      value: string;
    };
    phone: {
      label: string;
      value: string;
    };
    location: {
      label: string;
      value: string;
    };
  };

  socialsTitle: string;

  availability: {
    title: string;
    description: string;
  };

  form: {
    title: string;
    fields: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      subject: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
    };
    submit: {
      idle: string;
      loading: string;
    };
    status: {
      success: string;
      error: string;
    };
  };
};
