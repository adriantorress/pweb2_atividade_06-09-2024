const urls = [
    'https://economia.awesomeapi.com.br/last/USD-BRL',  // Dólar para Real
    'https://brasilapi.com.br/api/feriados/v1/2024',  // Feriados Nacionais
    'https://viacep.com.br/ws/57020600/json/',  // Endereço ViaCEP
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/2704302'  // Informações de Maceió (IBGE)
];

// Função para formatar a data no formato dia-mes-ano
function formatDate(dateString) {
    const [ano, mes, dia] = dateString.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Função para atualizar as seções com dados da API
function updateSection(url, sectionId, transformFunc) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (sectionId === 'section2') {  
                const today = new Date();
                const proxFeriado = data.find(feriado => new Date(feriado.date) > today);
                
                if (proxFeriado) {
                    const section = document.getElementById(sectionId);
                    section.querySelector('p').innerHTML = `Próximo Feriado Nacional: ${formatDate(proxFeriado.date)} - ${proxFeriado.name}`;
                } else {
                    document.getElementById(sectionId).querySelector('p').innerHTML = 'Nenhum feriado encontrado.';
                }
            } else if (sectionId === 'section3') {
                const section = document.getElementById(sectionId);
                section.querySelector('p').innerHTML = `
                    Logradouro: ${data.logradouro}<br>
                    Bairro: ${data.bairro}<br>
                    Cidade: ${data.localidade}<br>
                    Estado: ${data.uf}<br>
                    CEP: ${data.cep}
                `;
            } else {
                const section = document.getElementById(sectionId);
                section.querySelector('p').innerHTML = transformFunc(data);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            document.getElementById(sectionId).querySelector('p').innerHTML = 'Erro ao carregar dados.';
        });
}

updateSection(urls[0], 'section1', data => `Dólar em Real: R$${data.USDBRL.bid}`);
updateSection(urls[1], 'section2', data => ''); 
updateSection(urls[2], 'section3', data => '');
updateSection(urls[3], 'section4', data => `
    Cidade: ${data.nome}<br>
    Microrregião: ${data.microrregiao.nome}<br>
    Mesorregião: ${data.microrregiao.mesorregiao.nome}<br>
    Estado: ${data.microrregiao.mesorregiao.UF.nome}<br>
    Região: ${data.microrregiao.mesorregiao.UF.regiao.nome}
`);
