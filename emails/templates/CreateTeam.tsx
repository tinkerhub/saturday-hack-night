import {
	Container,
	Head,
	Html,
	Preview,
	Text,
	Section,
	Img,
	Font,
} from "@react-email/components";

const main = {
	fontFamily: "Clash Display, Arial, sans-serif",
	backgroundColor: "#0C0F17",
};
const container = {
	margin: "50px auto",
	border: ".5px solid rgba(255, 255, 255, 0.3)",
	borderRadius: "8px",
	padding: "24px",
};
const h1 = {
	color: "white",
	fontWeight: 700,
	fontSize: "18px",
};
const body = {
	marginTop: "24px",
	backgroundColor: "rgba(255, 255, 255, 0.1)",
	padding: "18px",
	borderRadius: "8px",
};
const accent = {
	color: "#DBF72C",
};
const mainText = {
	color: "white",
	fontSize: "55px",
	fontWeight: 600,
	lineHeight: "64px",
};
const textSeco = {
	color: "white",
	fontSize: "18px",
	fontWeight: 400,
};
const textTert = {
	color: "white",
	fontSize: "17px",
	fontWeight: 400,
	marginTop: "18px",
	textDecoration: "none",
};
const logo = {
	marginTop: "24px",
};

interface Props {
	teamID: string;
}

const Create = ({ teamID }: Props) => (
	<Html lang="en">
		<Head>
			<Font
				fontFamily="Clash Display"
				fallbackFontFamily="Arial"
				fontWeight={400}
				webFont={{
					url: "https://firebasestorage.googleapis.com/v0/b/saturday-hack-night.appspot.com/o/fonts%2FClashDisplayRegular.woff?alt=media&token=b075b250-ed7d-401b-b836-2fc2e40c8390",
					format: "woff2",
				}}
			/>
			<Font
				fontFamily="Clash Display"
				fallbackFontFamily="Arial"
				fontWeight={600}
				webFont={{
					url: "https://firebasestorage.googleapis.com/v0/b/saturday-hack-night.appspot.com/o/fonts%2FClashDisplaySemibold.woff?alt=media&token=132a0cd9-a0d4-4c52-ab1e-d224f224f4b5",
					format: "woff2",
				}}
			/>
			<Font
				fontFamily="Clash Display"
				fallbackFontFamily="Arial"
				fontWeight={700}
				webFont={{
					url: "https://firebasestorage.googleapis.com/v0/b/saturday-hack-night.appspot.com/o/fonts%2FClashDisplayBold.woff?alt=media&token=f39d2416-9f11-4500-b16c-d59b9c54bfce",
					format: "woff2",
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
						<span style={accent}>Congratulations 🎉</span>
						<br />
						Your team has been created
					</Text>
					<Text style={textSeco}>
						An unique Invitation mail to join the team has been send to all Team
						Members. They will be part of your team once they accept the
						invitation.
					</Text>
				</Container>
				<Text style={textTert}>
					Your Team ID is
					<span style={accent}> {teamID}</span>
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

export default Create;
