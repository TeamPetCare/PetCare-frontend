import emailjs from "emailjs-com";

const sendEmail = (formData) => {
    const templateParams = {
        nomeCompleto: formData.nomeCompleto,
        email: formData.email,
        telefone: formData.telefone,
    }

    return emailjs.send(
        "service_b3crl8i",
        "template_0ogcnah",
        templateParams,
        "oofBaqBKj3I0o-DpT"
    )
}

export default sendEmail;