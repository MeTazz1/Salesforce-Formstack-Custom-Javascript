function FF_OnAfterRender(){ 
    // 	All initializations

	var page1 = fs('#ffPage17');
	var page2 = fs('#ffPage18');
	var page3 = fs('#ffPage582');

    var password = $('#Account\\.Password__c');
    var confirmPassword = $('#FSGFShortAnswer706');
    password.attr("type", "password");
    confirmPassword.attr("type", "password");
	
	$('#Account\\.PersonBirthdate').on('change', function() {
        var birthDateValue = $(this).val();
        var birthDate = new Date(birthDateValue);
		var tempDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
		var showGuardian = tempDate > new Date();
		if (showGuardian === true) {
            $('.group-2').show();
		} else {
		    $('.group-2').hide();
		}
		return true;
    });


	$("#Account\\.PersonMobilePhone").keydown(function(event) {
	    var phoneNumberField = $(this);
	    var phoneNumberValue = phoneNumberField.val();
	   if (event.keyCode != 8) { // Backspace
			if (phoneNumberValue.length == 3 || phoneNumberValue.length == 7) {
		    	$(this).val(phoneNumberValue + '-')
		    } else if (phoneNumberValue.length == 12) {
		    	return false;
		    }	
	    }
	    return true;
	});

	$("#Account\\.Guardian_s_Phone__c").keydown(function(event) {
	    var phoneNumberField = $(this);
	    var phoneNumberValue = phoneNumberField.val();
	   if (event.keyCode != 8) { // Backspace
			if (phoneNumberValue.length == 3 || phoneNumberValue.length == 7) {
		    	$(this).val(phoneNumberValue + '-')
		    } else if (phoneNumberValue.length == 12) {
		    	return false;
		    }	
	    }
	    return true;
	});

	$("#Account\\.Guardian_s_Phone__c").focusout(function() {
		checkErrors();
		return true;
	});
	$("#Account\\.PersonMobilePhone").focusout(function() {
		checkErrors();
		return true;
	});



    $("#Account\\.Password__c").on('change', function() {
    	checkErrors();
	    return true;
	});

	function checkErrors() {
		var hasError = false;

		var isPage1 = page1.is(":visible");
    	var isPage2 = page2.is(":visible");
    	var isPage3 = page3.is(":visible");
    	if (isPage1) {
		    
    	}
    	else if (isPage2) {
    		var passwordValue = $("#Account\\.Password__c").val();
    		if (passwordValue) {
    			var lengthRule = false, lowercaseRule = false, uppercaseRule = false, numbersRule = false, specialsRules = false;
			    var validRules = 0;
			    if (passwordValue.length >= 8 && passwordValue.length <= 24)
			    	validRules++;
			    if (/[a-z]/.test(passwordValue)) {
			    	validRules++;
			    }
			    if (/[A-Z]/.test(passwordValue)) {
			    	validRules++;
			    }
			    if (/[0-9]/.test(passwordValue)) {
			    	validRules++;
			    }
			    if (/[@#!$%&]/.test(passwordValue)) {
			    	validRules++;
			    }
			    
			    if (validRules < 5) {
			        alert('Password must have between 8 and 24 characters, and must contains at least 1 number, 1 uppercase, and one special character (@#!$%&)');
			        hasError = true;
			    }
    		}
		    

		    var patientPhoneValue = $("#Account\\.PersonMobilePhone").val();
		    if (patientPhoneValue) {
		    	let match = patientPhoneValue.match(/^[2-9]\d{2}-\d{3}-\d{4}$/);
			    if (!match) {
			    	alert('Invalid format for Patient Mobile Phone. Correct format is XXX-XXX-XXXX');
			    	$("#Account\\.PersonMobilePhone").css('border', "1px solid red");
			    	hasError = true;
				} else {
			    	$("#Account\\.PersonMobilePhone").css('border', "1px solid rgb(183, 187, 190)");
				}
		    }
		    

		    var guardianPhoneValue = $("#Account\\.Guardian_s_Phone__c").val();
		    if (guardianPhoneValue) {
		    	let match = guardianPhoneValue.match(/^[2-9]\d{2}-\d{3}-\d{4}$/);
		    	if (!match) {
			    	alert('Invalid format for Guardian Mobile Phone. Correct format is XXX-XXX-XXXX');
			    	$("#Account\\.Guardian_s_Phone__c").css('border', "1px solid red");
			    	hasError = true;
				} else {
			    	$("#Account\\.Guardian_s_Phone__c").css('border', "1px solid rgb(183, 187, 190)");
				}
		    }
		   

    	}
    	else if (isPage3) {

    	}
		$('#btnnext').attr('disabled', hasError);
		$('#btnnext').css("background-color", hasError === true ? "gray" : "rgba(0,156,227,1)");
		return true;
	}
}
    
