import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';


function Background() {
    return (
        <>
            <video autoPlay muted loop>
                <source src="bluematrixtrim.mp4" type="video/mp4" />
            </video>
            <style jsx>{`
				video {
					position: absolute;
					z-index: -100;
					width: 100vw;
					height: 100vh;
					object-fit: cover;
				}
			`}</style>
        </>
    )
}

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length + 1,
            de: 'henriquelauar',
            texto: novaMensagem,
        };

        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
        setMensagem('');
    }

    return (
        <>
            <Background />
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals[400],
                        height: '90%',
                        maxWidth: '85%',
                        maxHeight: '95vh',
                        padding: '32px',
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >

                        <MessageList mensagens={listaDeMensagens} />

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value={mensagem}
                                onChange={(event) => {
                                    const valor = event.target.value;
                                    setMensagem(valor);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />
                            <Button
                                styleSheet={{ marginBottom: '10px', }}
                                type='submit'
                                label='Enviar'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNovaMensagem(mensagem);
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[700],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading4'>
                    Chat
                </Text>
                <Button
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.neutrals[800],
                        mainColorLight: appConfig.theme.colors.primary[1000],
                        mainColorStrong: appConfig.theme.colors.primary[1000],
                    }}
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (


                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/henriquelauar.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                                <Text
                                    styleSheet={{
                                        fontSize: '12px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                                <Button
                                    onClick={(e) => {
                                        
                                    }}
                                    label='x'
                                    styleSheet={{ marginLeft: '97.5%', bottom: '15px', width: '5px', height: '5px' }}
                                    buttonColors={{
                                        contrastColor: appConfig.theme.colors.neutrals["000"],
                                        mainColor: appConfig.theme.colors.neutrals[800],
                                        mainColorLight: appConfig.theme.colors.primary[1000],
                                        mainColorStrong: appConfig.theme.colors.primary[1000],
                                    }}></Button>
                            </Text>

                        </Box >
                        {mensagem.texto}
                    </Text>

                );
            })}
        </Box>
    )
}
