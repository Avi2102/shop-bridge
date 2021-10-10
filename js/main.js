let cardList = $('.card-list');
const listData = ()=>{
cardList.html('');
productData.forEach((product) => [
        cardList.append(`
            <div class="card" key="${product.key}">
                <div class="card-header">
                    <h3 class="card-title">${product.title}</h3>
                    <h6 class="product-price">${product.price}</h6>
                </div>
                <div class="card-body">
                    <p class="card-text">${product.description}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary edit-btn">Edit Item</button>
                    <button class="btn btn-danger delete-btn">Delete Item</button>
                </div>
            </div> 
        `)
    ])
}
listData();
$('.add-more').click(function(e){
    e.preventDefault();
    $('.add-container').addClass('active');
    $('.inventory-section').hide();
});
const checkFormValidation = (ele)=>{
    let valid = false;
    $('.error-msg').remove();
    ele.find('.form-control').each(function(i,input){
        let t = $(this);
        if(t.val().trim() == ""){
            t.addClass('error').after('<span class="error-msg">This field is mandatory</span>');
            valid = false;
        }
    })
    if(!ele.find('.error-msg').length){
        valid = true;
    }
    return valid;
}
$('.form-control').on('change blur keypress', function(){
    if(!$(this).val().trim() == "") {
        $(this).removeClass('error');
        $(this).next('.error-msg').remove();
    }
});
$('#addProduct').on('submit', function(e){
    e.preventDefault()
    let form = $(this);
    let key = productData.length+1;
    let title =  form.find('#title').val();
    let description =  form.find('#description').val();
    let price =  form.find('#price').val();
    let valid = checkFormValidation(form);
    if(valid){
        productData.push({key,title,description,price});
        listData();
        $('.add-container').removeClass('active');
        $('.inventory-section').show();
    }
});
$('.card-list').on('click','.delete-btn', function(e){
    let k = $(this).closest('.card').attr('key');
    let data = productData.filter(function(product,i){
    return product.key != k
    })
    productData = [];
    productData = data;
    listData();
})
$('.card-list').on('click','.edit-btn', function(e){
    $('.edit-container').addClass('active');
    $('.inventory-section').hide();
    let k = $(this).closest('.card').attr('key');
    let filData = productData.filter(function(product,i){
        return product.key == k
    });
    let product = filData[0];
    let form = $('#editProduct');
    form.find('.error-msg').remove();
    $('#editProduct').attr('data-edit-key',k)
    form.find('#title').val(product.title);
    form.find('#description').val(product.description);
    form.find('#price').val(product.price);
})
$('#editProduct').on('submit', function(e){
    e.preventDefault();
    let k = $(this).attr('data-edit-key');
    let form = $(this);
    let title =  form.find('#title').val();
    let description =  form.find('#description').val();
    let price =  form.find('#price').val();
    let valid = checkFormValidation(form);
    if(valid){
        let data = productData.map(function(item,i){
            if(item.key == k){
                item.key = k;
                item.title = title;
                        item.description = description;
                        item.price = price;
                    }
                    return item   
                })
                $('.edit-container').removeClass('active');
                $('.inventory-section').show();
                listData();
            }
        });

        $('.cancel-btn').click(function(e){
            e.preventDefault();
            $('.add-container, .edit-container').removeClass('active');
            $('.inventory-section').show();
            $(this).closest('form').find('.form-control').each(function(){
                $(this).removeClass('error');
                $(this).next('.error-msg').remove();
            })
        });