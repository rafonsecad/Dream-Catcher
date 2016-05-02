window.onload = function(){
    var formsList = document.querySelectorAll('form');
    var wrapper = document.createElement('div');
    
    var ngAttr = document.createAttribute('ng-app');
    ngAttr.value = 'myApp';
    wrapper.setAttributeNode(ngAttr);
    
    ngAttr = document.createAttribute('ng-controller');
    ngAttr.value = 'ctrl';
    wrapper.setAttributeNode(ngAttr);
    
    while (document.body.firstChild){
        wrapper.appendChild(document.body.firstChild);
    }
    
    document.body.appendChild(wrapper);
    
    formsList = document.querySelectorAll('form');
    for (i=0; i<formsList.length; i++){
        setFormAttrs(formsList[i], i);
    }
    
    ExecuteAngularApp();
}();

function setFormAttrs (form, iterator){
    var inputs = form.querySelectorAll('input');
    var textCount = 0;
    var ngAttr;
    
    for (var k=0; k < inputs.length; k++){
        if (inputs[k].type == 'text' || inputs[k].type == 'password'){
            ngAttr = document.createAttribute('ng-model');
            ngAttr.value = 'Form.' + 'Text' + iterator + '_' + textCount;
            inputs[k].setAttributeNode(ngAttr);
            textCount++;
        }
        if (inputs[k].type == 'submit'){
            ngAttr = document.createAttribute('ng-click');
            ngAttr.value = 'formNumber=' + iterator + ';'+ 'nbrInputs=' + textCount + ';' + 'click();';
            inputs[k].setAttributeNode(ngAttr);
            break;
        }
    }
}

function ExecuteAngularApp(){
    var app = angular.module('myApp', []);
    
    app.controller('ctrl', function($scope){
        $scope.Form = {};
        $scope.click = function (){
            var data = {};
            //window.location.href;
            for (var inputId=0; inputId<$scope.nbrInputs; inputId++){
                var formInput = $scope.Form['Text' + $scope.formNumber + '_' + inputId];
                if (formInput === undefined){
                    formInput = '';
                }
                data[inputId] = formInput;
                //console.log(formInput);
            }
            console.log(data);
            $scope.Text = 'submit Form No. ' + $scope.formNumber;
            
        };
    });
}