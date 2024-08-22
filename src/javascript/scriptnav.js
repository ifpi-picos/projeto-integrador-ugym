//sidebar
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

//downbar

const lista = document.querySelectorAll('.lista')

function ativaLink(){
    for(let i of lista){
        i.classList.remove('ativo')
    }
    this.classList.add('ativo')
}

for(let i of lista){
    i.addEventListener('click', ativaLink)
}

function logout(){
const logout = document.querySelector('#logout')
localStorage.removeItem('token')
localStorage.removeItem('user')
window.location.href="index.html"

}

function remove(){
        const activeItem = document.querySelector('.side-item.active');
        activeItem.remove();
}