let bet = {}
const form = document.querySelector("form")
form.addEventListener( "submit", (event) => {
    event.preventDefault()

    form.querySelectorAll("label").forEach(element => {
        element.classList.remove("invalid")
    });

    if (form.teama.value === "" || form.teama.value.length < 3) {
        form.teama.parentElement.classList.add("invalid")
        return
    }
    if (form.teamb.value === "" || form.teamb.value.length < 3) {
        form.teamb.parentElement.classList.add("invalid")
        return
    }
    if (form.championship.value === "" || form.championship.value.length < 3) {
        form.championship.parentElement.classList.add("invalid")
        return
    }
    if (form.date.value === "" || !form.date.value.match(/^\d{4}\-\d{2}\-\d{2}$/gi)) {
        form.date.parentElement.classList.add("invalid")
        return
    }
    if (form.time.value === "" || !form.time.value.match(/^\d{2}:\d{2}$/gi)) {
        form.time.parentElement.classList.add("invalid")
        return
    }
    if (form.amount.value === "") {
        form.amount.parentElement.classList.add("invalid")
        return
    }

    let myd = form.date.value.split("-")

    bet = {
        teama : form.teama.value.toUpperCase(),
        teamb : form.teamb.value.toUpperCase(),
        championship : form.championship.value.toUpperCase(),
        date : `${myd[2]}/${myd[1]}/${myd[0]}`,
        time : form.time.value,
        amount : form.amount.value
    }

    doPDF()
})

function formReset() {
    form.querySelectorAll("label").forEach(element => {
        element.classList.remove("invalid")
    });
    form.reset()
}


function doPDF(){
    let myWindow = window.open("", "_blank")
    myWindow.document.write("<html><head>")
    myWindow.document.write("<title>Bolão entre amigos</title>")
    myWindow.document.write("<link rel='stylesheet' href='./print.css'>")
    myWindow.document.write("</head><body>")

    myWindow.document.write("<header>")
    myWindow.document.write("<h1>BOLÃO ENTRE AMIGOS</h1>")
    myWindow.document.write(`<h2>${bet.teama} x ${bet.teamb}</h2>`)
    myWindow.document.write(`<h3>${bet.date}, às ${bet.time}h</h3>`)
    myWindow.document.write("<h4>REGRAS</h4>")
    myWindow.document.write("<ol>")
    myWindow.document.write("<li>As apostas poderão ser feitas <strong>até 01 minuto antes do início da partida</strong> e serão aceitas apenas 2 apostas com placar repetido.</li>")
    myWindow.document.write("<li>O bolão é válido para o tempo regulamentar de jogo e prorrogação, caso houver.</li>")
    myWindow.document.write(`<li>O valor de cada aposta é de <strong>R$ ${bet.amount}</strong>, e deve ser pago no ato da aposta.</li>`)
    myWindow.document.write("<li>Caso não haja vencedor, o valor total do arrecadado ficará para o organizador do bolão.</li>")
    myWindow.document.write("</ol>")
    myWindow.document.write("</header>")

    myWindow.document.write("<table>")
    myWindow.document.write(`<tr><th>${bet.teama}</th><th>${bet.teamb}</th><th width='50%'>ASSINATURAS</th></tr>`)

    for (let i = 0; i <= 19; i++) {
        myWindow.document.write("<tr><td>&nbsp;</td><td></td><td></td></tr>")
    }

    myWindow.document.write("</table>")

    // PAGE 2
    myWindow.document.write("<div class='divider'></div>")
    myWindow.document.write("<table>")
    myWindow.document.write(`<tr><th>${bet.teama}</th><th>${bet.teamb}</th><th width='50%'>ASSINATURAS</th></tr>`)

    for (let i = 0; i <= 25; i++) {
        myWindow.document.write("<tr><td>&nbsp;</td><td></td><td></td></tr>")
    }

    myWindow.document.write("</table>")

    myWindow.document.write("</body></html>")
    myWindow.document.close()
    // myWindow.print()
}