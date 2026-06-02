const API_URL = "https://script.google.com/macros/s/AKfycbwpml5vnZ2LXCYyCm7uN7n-PSjtceAQjnP7rpu0jXQwkf7L2GktqYDz90VthRgcQfxX/exec";

const userSetup = document.getElementById("userSetup");
const formSection = document.getElementById("formSection");

const username = document.getElementById("username");
const saveUserBtn = document.getElementById("saveUserBtn");

const kategori = document.getElementById("kategori");
const nominal = document.getElementById("nominal");
const keterangan = document.getElementById("keterangan");
const submitBtn = document.getElementById("submitBtn");

const savedUser = localStorage.getItem("mobi_user");

if(savedUser){
    userSetup.style.display = "none";
    formSection.style.display = "block";
}

saveUserBtn.addEventListener("click", () => {

    const user = username.value.trim();

    if(user === ""){
        alert("Nama user wajib diisi");
        return;
    }

    localStorage.setItem("mobi_user", user);

    userSetup.style.display = "none";
    formSection.style.display = "block";
});

nominal.addEventListener("input", () => {

    nominal.value = nominal.value.replace(/\./g, "");

});

submitBtn.addEventListener("click", async () => {

    const user = localStorage.getItem("mobi_user");

    const kategoriValue = kategori.value.trim();
    const nominalValue = nominal.value.trim();
    const keteranganValue = keterangan.value.trim();

    if(
        kategoriValue === "" ||
        nominalValue === "" ||
        keteranganValue === ""
    ){
        alert("Semua field wajib diisi");
        return;
    }

    if(!/^\d+$/.test(nominalValue)){
        alert("Nominal harus berupa angka");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Menyimpan...";

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user:user,
                kategori:kategoriValue,
                nominal:Number(nominalValue),
                keterangan:keteranganValue
            })
        });

        const result = await response.json();

        if(result.success){

            kategori.value = "";
            nominal.value = "";
            keterangan.value = "";

            alert("Data berhasil disimpan");

        }else{

            alert(result.message);

        }

    }catch(error){

        alert("Gagal menghubungi server");

    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
});
