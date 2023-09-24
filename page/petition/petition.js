document.getElementById('btn').addEventListener('click', function(event) {
  
    const petitionTitle = document.getElementById('petitionTitle').value;
    const petitionDescription = document.getElementById('petitionDescription').value;
    const petitionSigner = document.getElementById('petitionSigner').value;
    const petitionEmail = document.getElementById('petitionEmail').value;
  
    const petitionData = {
      title: petitionTitle,
      description: petitionDescription,
      signer: petitionSigner,
      email: petitionEmail
    };
  
    // Save petition data to localStorage
    // let petitions = JSON.parse(localStorage.getItem('petitions')) || [];
    // petitions.push(petitionData);
    // localStorage.setItem('petitions', JSON.stringify(petitions));
  
    // Clear the form
    alert('Ваша петиция успешно отпрвалена')

    window.location.replace('file:///C:/Users/Lenovo/Desktop/generation/page/news/news.html');
  });
  