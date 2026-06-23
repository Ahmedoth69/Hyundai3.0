function sendEmail(e){
    e.preventDefault();
    const UserName = document.getElementById('Uname').value;
    const UserEmail = document.getElementById('mail').value;
    const SelectedService = document.querySelector('input[name="service"]:checked');
    const reservationDate = document.getElementById('date').value;
    const reservationTime = document.getElementById('time').value;
    const UserPhone = document.getElementById("phone").value;
    if(!UserName.trim() || !UserEmail.trim() || !SelectedService || !reservationDate || !reservationTime || !UserPhone){
        alert("Veuillez remplir tous les champs du formulaire de réservation.");
        return;
    }
    const serviceName = SelectedService.value;
    const Data = {
        to_email : "ahmedgamer012345@gmail.com",
        Subject: "Reservation de service",
        from_name : UserName,
        from_email : UserEmail,
        service_type : serviceName,
        Date : reservationDate,
        time : reservationTime,
        Phone : UserPhone,
        message : `Bonjour,\n
        Je souhaite réserver un rendez-vous pour le service suivant :\n
        - Service : ${serviceName}\n
        - Date : ${reservationDate}\n
        - Heure : ${reservationTime}\n\n
        Nom : ${UserName}\n
        Email : ${UserEmail}\n
        Phone : ${UserPhone}`

    }

    emailjs.send("service_wy76g7p","template_9v25fma",Data).then((response) =>{
        sendConfirmationEmail(UserName, UserEmail);
        alert('Votre réservation a été envoyée avec succès. Nous vous contacterons bientôt.');
        document.getElementById('reservationForm').reset();
    })
    .catch((error) => { 
        console.error('EmailJS error:', error);
        alert('Une erreur est survenue lors de l’envoi. Veuillez réessayer plus tard.');
    });
}

// Function to send confirmation email to the user
function sendConfirmationEmail(UserName, UserEmail) {
    const confirmationData = {
        to_email: UserEmail,
        from_email: "ahmedgamer012345@gmail.com",
        Subject: "Confirmation de Reservation",
        from_name: "Hyundai Manouba",
        to_name: UserName,
        message: `Bonjour ${UserName},\n\n
        Votre Reservation a ete envoye avec succes.\n\n
        Nous avons bien reçu votre demande de réservation. Notre équipe examinera votre demande et vous contactera très bientôt pour confirmer votre rendez-vous.\n\n
        Merci de faire confiance à Hyundai Manouba!\n\n
        Cordialement,\n
        L'équipe Hyundai Manouba`
    };

    emailjs.send("service_wy76g7p", "template_9v25fma", confirmationData)
    .catch((error) => {
        console.error('Confirmation email error:', error);
    });
}

// Attach event listener when page loads
document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    if(reservationForm) {
        reservationForm.addEventListener('submit', sendEmail);
    }
});