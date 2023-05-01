import {
    Container,
    Head,
    Html,
    Preview,
    Text,
    Section,
    Img,
    Button,
    Font,
} from '@react-email/components';

const main = {
    fontFamily: 'Clash Display, Arial, sans-serif',
    backgroundColor: '#0C0F17',
};
const container = {
    margin: '50px auto',
    border: '.5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '24px',
};
const h1 = {
    color: 'white',
    fontWeight: 700,
    fontSize: '18px',
};
const body = {
    marginTop: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '18px',
    borderRadius: '8px',
};
const accent = {
    color: '#DBF72C',
};
const mainText = {
    color: 'white',
    fontSize: '55px',
    fontWeight: 600,
    lineHeight: '64px',
};
const textSeco = {
    color: 'white',
    fontSize: '18px',
    fontWeight: 400,
};
const btn = {
    backgroundColor: 'white',
    color: '#0C0F17',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: '12px 24px',
    fontWeight: 500,
    fontSize: '18px',
};
const textTert = {
    color: 'white',
    fontSize: '17px',
    fontWeight: 400,
    marginTop: '18px',
    textDecoration: 'none',
};
const logo = {
    marginTop: '24px',
};

interface Props {
    teamName: string;
    lead: string;
    inviteCode: string;
    teamID: string;
}

const Invite = ({ teamName, lead, inviteCode, teamID }: Props) => (
    <Html lang="en">
        <Head>
            <Font
                fontFamily="Clash Display"
                fallbackFontFamily="Arial"
                fontWeight={400}
                webFont={{
                    url: 'https://fonts.cdnfonts.com/s/65008/ClashDisplayRegular.woff',
                    format: 'woff2',
                }}
            />
            <Font
                fontFamily="Clash Display"
                fallbackFontFamily="Arial"
                fontWeight={600}
                webFont={{
                    url: 'https://fonts.cdnfonts.com/s/65008/ClashDisplaySemibold.woff',
                    format: 'woff2',
                }}
            />
            <Font
                fontFamily="Clash Display"
                fallbackFontFamily="Arial"
                fontWeight={700}
                webFont={{
                    url: 'https://fonts.cdnfonts.com/s/65008/ClashDisplayBold.woff',
                    format: 'woff2',
                }}
            />
            <Font
                fontFamily="Clash Display"
                fallbackFontFamily="Arial"
                fontWeight={500}
                webFont={{
                    url: 'https://fonts.cdnfonts.com/s/65008/ClashDisplayMedium.woff',
                    format: 'woff2',
                }}
            />
        </Head>
        <Preview>Welcome to Saturday HackNight</Preview>
        <Section style={main}>
            <Container style={container}>
                <Text style={h1}>
                    SATURDAY
                    <br />
                    HACKNIGHT
                    <span style={accent}>.</span>
                </Text>
                <Container style={body}>
                    <Text style={mainText}>
                        You have been invited to join team
                        <span style={accent}>{teamName}</span> by <span style={accent}>{lead}</span>
                    </Text>
                    <Text style={textSeco}>
                        Team-up with your crew and ship the product of this week in Saturday Hack
                        Night.
                    </Text>
                    <Button
                        style={btn}
                        href={`https://hacknight.tinkerhub.org/join?invite=${inviteCode}`}
                    >
                        Accept Invite
                    </Button>
                </Container>
                <Text style={textTert}>
                    Your Team ID is
                    <span style={accent}> {teamID}</span>
                </Text>
                <Text style={textTert}>
                    If you are having problem with the link above, try using this link to join team{' '}
                    <br />
                    <a
                        style={accent}
                        href={`https://hacknight.tinkerhub.org/join?invite=${inviteCode}`}
                    >
                        https://hacknight.tinkerhub.org/join?invite={inviteCode}
                    </a>
                </Text>
                <Img
                    style={logo}
                    src="https://i.ibb.co/rv67kWJ/tinkerhub-logo.png"
                    width="137px"
                    height="41.27px"
                    alt="Tinkerhub Foundation"
                />
            </Container>
        </Section>
    </Html>
);

export default Invite;
