//listener for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //show loader
    document.getElementById('loading').style.display='block';
    //timer for loader
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

 //calculate results
 function calculateResults(){
     //UI variables
     const amount=document.getElementById('amount');
     const interest=document.getElementById('interest');
     const years=document.getElementById('years');
     const monthlyPayment=document.getElementById('monthly-payment');
     const totalPayment=document.getElementById('total-payment');
     const totalInterest=document.getElementById('total-interest');


     const principal=parseFloat(amount.value);
     const calculatedInterest=parseFloat(interest.value)/100/12;
     const calculatedPayments = parseFloat(years.value) * 12;

     //compute monthly payment
     const x = Math.pow(1 + calculatedInterest, calculatedPayments);
     const monthly = (principal*x*calculatedInterest)/(x-1);

     //validation
     if(isFinite(monthly)){
         monthlyPayment.value=monthly.toFixed(2);
         totalPayment.value=(monthly*calculatedPayments).toFixed(2);
         totalInterest.value=((monthly*calculatedPayments)-principal) .toFixed(2);  
         
         //hide loader
         document.getElementById('loading').style.display='none';
         //show results
         document.getElementById('results').style.display='block';
     }else{
         showError('Please check your values');
     } 
 }

 //showing error
 function showError(error) {
     //hide loader
     document.getElementById('loading').style.display='none';

    //create a div
    const errorDiv = document.createElement('div');
    //create the className
    errorDiv.className='alert alert-danger';
    //create a textnode nd append to it
    errorDiv.appendChild(document.createTextNode(error));

    //get elements for display errorDiv
    const card =document.querySelector('.card');
    const heading=document.querySelector('.heading');
    //insert error above the heading
    card.insertBefore(errorDiv, heading);


    //clear errror
    setTimeout(clearError,3000);
 }

 //clear error
 function clearError(){
     document.querySelector('.alert').remove();
 }