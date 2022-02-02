import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../components/ButtonSendSticker'
import { IoMdSend } from "react-icons/io";
import format from "date-fns/format";


function Background() {
    return (
        <>
            <video autoPlay muted loop>
                <source src="./assets/interstellar0-background.mp4" type="video/mp4" />
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

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwMTA4MiwiZXhwIjoxOTU4ODc3MDgyfQ.YaGNtv10q0GwljUyKzE8qNZWbI0KaItA3XG97_J3IEw'
const supabaseURL = 'https://bjbutrmryhucijziezxt.supabase.co'
const supabaseClient = createClient(supabaseURL, supabaseAnonKey)

function mensagensTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const userLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data }) => {
                setListaDeMensagens(data);
            });

        const subscription = mensagensTempoReal((novaMensagem) => {
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: userLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {

            });
        setMensagem('');
    }

    function Header() {
        return (
            <>
                <Box styleSheet={{
                    width: '100%',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'white',
                    height: '34.8px',
                }}
                >
                    <Text variant='heading3'>
                        Chat
                    </Text>
                    <p>Logged in as <br />{userLogado}</p>
                    <Image
                        styleSheet={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                        }}
                        src={`https://github.com/${userLogado}.png`}
                    />
                    <Button
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.neutrals[900],
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

    return (
        <>
            <Background />
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0.9',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        height: '100%',
                        maxWidth: '80%',
                        maxHeight: '98vh',
                        padding: '32px',
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals[600],
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
                                    height: '48px',
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '4px',
                                    marginTop: '8px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />                            
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNovaMensagem(mensagem);
                                }}
                                label={<IoMdSend size={`15px`} color="#E2E8F0" />}
                                styleSheet={{
                                    height: '48px',
                                    width: '48px',
                                    marginRight: '4px',
                                    borderRadius: '0.4rem',
                                    border: 'none',
                                    background: '#181F25',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    right: '20px',
                                    transition: 'opacity 0.2s ease-in-out',
                                    hover: {
                                        opacity: '0.8',
                                    }
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorLight: appConfig.theme.colors.neutrals[700],
                                    mainColorStrong: appConfig.theme.colors.neutrals[700],
                                }}
                            />
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    handleNovaMensagem(':sticker:' + sticker)
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )

    function MessageList(props) {
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
                    const dateFormatted = format(new Date(mensagem.created_at), "dd/MM/yyyy HH:mm");
                    return (
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '14px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >
                            <Box styleSheet={{ marginRight: '15px' }}>
                                <Image
                                    styleSheet={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '12px',
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}
                                />
                                <Text tag="strong" styleSheet={{ fontSize: 'smaller' }}>
                                    {mensagem.de}
                                    <Text
                                        styleSheet={{
                                            fontSize: 'small',
                                            marginLeft: '8px',
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    > <br />
                                        <Text
                                            styleSheet={{
                                                fontSize: 'small',
                                                marginLeft: '35px',
                                                color: appConfig.theme.colors.neutrals[300],
                                            }}>
                                            {dateFormatted}</Text>
                                    </Text>
                                    { userLogado === mensagem.de ?
                                    <Button
                                        onClick={() => {
                                            let resposta = confirm('Deseja remover essa mensagem?')
                                            if (resposta === true) {
                                                supabaseClient
                                                    .from('mensagens')
                                                    .delete()
                                                    .match({ id: mensagem.id }).then(() => {
                                                        let indice = listaDeMensagens.indexOf(mensagem);
                                                        listaDeMensagens.splice(indice, 1)
                                                        setListaDeMensagens([...listaDeMensagens])
                                                    })
                                            }
                                        }}
                                        label='x'
                                        styleSheet={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: '96%',
                                            bottom: '3vh',
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '30%',
                                        }}
                                        buttonColors={{
                                            contrastColor: appConfig.theme.colors.neutrals["000"],
                                            mainColor: appConfig.theme.colors.neutrals[800],
                                            mainColorLight: appConfig.theme.colors.primary[1000],
                                            mainColorStrong: appConfig.theme.colors.primary[1000],
                                        }}>
                                    </Button> : null}
                                </Text>
                            </Box>
                            {mensagem.texto.startsWith(':sticker:')
                                ? (
                                    <Image src={mensagem.texto.replace(':sticker:', '')} styleSheet={{ height: '20vh' }} />
                                ) :
                                (
                                    mensagem.texto
                                )}
                        </Text>

                    );
                })}
            </Box>
        )
    }
}