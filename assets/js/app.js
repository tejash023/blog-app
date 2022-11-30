//Initialize Quill editor
var toolbarOptions = [
  [{ 'font': [] }],
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  ['bold', 'italic', 'underline', 'strike', { 'script': 'super' }],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                          
    

  [{ 'color': [] }],          // dropdown with defaults from theme

  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

var form = document.querySelector(".add-blog-section");
var hiddenInput = document.querySelector('#quill-html');

form.addEventListener('submit', function(e){
  hiddenInput.value = quill.root.innerHTML;
});