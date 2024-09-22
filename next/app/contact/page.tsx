import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div>
      <h1 className='margin-top'>お問い合わせ</h1>
      <p>
        ご質問、ご相談は下記フォームよりお問い合わせください。
        <br />
        内容確認後、担当者より通常3営業日以内にご連絡いたします。
      </p>
      <ContactForm />
    </div>
  );
};

export default Contact;
