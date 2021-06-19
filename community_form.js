// Community Form
window.FF_OnAfterRender = function() {

	var page1 = fs('#ffPage198');
	var page2 = fs('#ffPage199');
	var page3 = fs('#ffPage650');

   // On change Events
   fs("#Account\\.PersonMobilePhone").bind("keydown", function (event) {
	    var phoneNumberField = document.getElementById("Account.PersonMobilePhone");
	    var phoneNumberValue = phoneNumberField.value;
	    if (event.keyCode != 8) { // Backspace
			if (phoneNumberValue.length == 3 || phoneNumberValue.length == 7) {
		    	phoneNumberField.value = phoneNumberValue + '-';
		    } else if (phoneNumberValue.length == 12) {
		    	return false;
		    }	
	    }
	    return true;
	});

	fs("#FSGFShortAnswer86").bind("keydown", function (event) {
   		console.log('code: ' + event.keyCode);
	    var phoneNumberField = document.getElementById("FSGFShortAnswer86");
	    var phoneNumberValue = phoneNumberField.value;
	   	if (event.keyCode != 8) { // Backspace
			if (phoneNumberValue.length == 3 || phoneNumberValue.length == 7) {
		    	phoneNumberField.value = phoneNumberValue + '-';
		    } else if (phoneNumberValue.length == 12) {
		    	return false;
		    }	
	    }
	    return true;
	});

	// On focusout events
	fs("#Account\\.PersonMobilePhone").focusout(function() {
	    checkErrors();
	    return true;
	});

	fs("#FSGFShortAnswer86").focusout(function() {
	    checkErrors();
	    return true;
	});

	fs("#Account\\.PersonBirthdate").focusout(function() {
		var birthDateValue = document.getElementById("Account.PersonBirthdate").value;
		var birthDate = new Date(birthDateValue);
		var tempDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
		var showGuardian = tempDate > new Date();
		if (showGuardian === true) {
            fs('.group-3').show();
            fs('#Account\\.Guardian_s_Name__c').attr('required', true);
            fs('#Account\\.Guardian_s_Last_Name__c').attr('required', true);
            fs('#Account\\.Guardian_s_Phone__c').attr('required', true);
            fs('#FSGFShortAnswer527').attr('required', true);            
		} else {
		    fs('.group-3').hide();
		    fs('#Account.Guardian_s_Name__c').attr('required', false);
            fs('#Account.Guardian_s_Last_Name__c').attr('required', false);
            fs('#Account.Guardian_s_Phone__c').attr('required', false);
            fs('#FSGFShortAnswer527').attr('required', false);   
		}
		return true;
	});


	/* On change fields */
	fs('#Account\\.Follow_Status__c').on('change', function() {
		// Add any type of logic here
	});


	fs("#Account\\.Follow_Update__c").on('change', function() {
		checkErrors();
	});
	

	function checkErrors() {
		var hasError = false;

		var isPage1 = page1.is(":visible");
    	var isPage2 = page2.is(":visible");
    	var isPage3 = page3.is(":visible");

    	if (isPage1) {
    		var phoneNumberField = document.getElementById("Account.PersonMobilePhone");
		    let phoneNumberValue = phoneNumberField.value;
		    if (phoneNumberValue) {
			    var phoneMatch = phoneNumberValue.match(/^[2-9]\d{2}-\d{3}-\d{4}$/);
			    if (!phoneMatch) {
			    	alert('Invalid format for Patient Mobile Phone. Correct format is XXX-XXX-XXXX');
			    	phoneNumberField.style.border = "1px solid red";
			    	hasError = true;
				} else {
			    	phoneNumberField.style.border = "1px solid rgb(183, 187, 190)";
				}
		    }
		    var confirmPhoneNumberField = document.getElementById("FSGFShortAnswer86");
		    let confirmPhoneNumberValue = confirmPhoneNumberField.value;
		    if (confirmPhoneNumberValue) {
			    var phoneMatch = confirmPhoneNumberValue.match(/^[2-9]\d{2}-\d{3}-\d{4}$/);
			    if (!phoneMatch) {
			    	alert('Invalid format for Confirm Patient Mobile Phone. Correct format is XXX-XXX-XXXX');
			    	confirmPhoneNumberField.style.border = "1px solid red";
			    	hasError = true;
				} else {
			    	confirmPhoneNumberField.style.border = "1px solid rgb(183, 187, 190)";
				}
		    }
		    var guardianPhoneNumberField = document.getElementById("Account.Guardian_s_Phone__c");
		    let guardianPhoneNumberValue = guardianPhoneNumberField.value;
			if (guardianPhoneNumberValue) {
			    var guardianPhoneMatch = guardianPhoneNumberValue.match(/^[2-9]\d{2}-\d{3}-\d{4}$/);
			    if (!guardianPhoneMatch) {
			    	alert('Invalid format for Parent/Guardian Mobile Phone. Correct format is XXX-XXX-XXXX');
			    	guardianPhoneNumberField.focus();
			    	hasError = true;
				} else {
			    	confirmGuardianPhoneNumberField.style.border = "1px solid rgb(183, 187, 190)";
				}
		    }
		    var confirmGuardianPhoneNumberField = document.getElementById("FSGFShortAnswer527");
		    let confirmGuardianPhoneNumberValue = confirmGuardianPhoneNumberField.value;
		    if (confirmGuardianPhoneNumberValue) {
			    var confirmGuardianPhoneMatch = confirmGuardianPhoneNumberValue.match(/^[2-9]\d{2}-\d{3}-\d{4}$/);
			    if (!confirmGuardianPhoneMatch) {
			    	alert('Invalid format for Parent/Guardian Mobile Phone. Correct format is XXX-XXX-XXXX');
			    	confirmGuardianPhoneNumberField.style.border = "1px solid red";
			    	hasError = true;
				} else {
			    	confirmGuardianPhoneNumberField.style.border = "1px solid rgb(183, 187, 190)";
				}
		    }
    	} 
    	else if (isPage2) {
    		// Verify logic for Page 2
    	} 
    	else if (isPage3) {
    		// Verify logic for Page 2
    	}
		
		fs('#btnnext').attr('disabled', hasError);
		fs('#btnnext').css("background-color", hasError === true ? "gray" : "rgba(0,156,227,1)");
		return true;
	}

	return true;
}
