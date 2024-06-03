import Svg, { Path, SvgProps } from 'react-native-svg'

export const CalendarIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.997 21.05c-2.143 0-3.22-1.055-3.22-3.178V5.352c0-2.123 1.077-3.179 3.22-3.179h14.006c2.143 0 3.21 1.067 3.21 3.179v12.52c0 2.112-1.067 3.179-3.21 3.179H4.997zM3.5 5a1 1 0 011-1h15a1 1 0 011 1v.8a1 1 0 01-1 1h-15a1 1 0 01-1-1V5zm6.5 5.54c-.358 0-.481-.102-.481-.46v-.606c0-.359.123-.472.482-.472h.604c.36 0 .472.113.472.472v.605c0 .359-.113.461-.472.461h-.604zm3.405 0c-.36 0-.482-.102-.482-.46v-.606c0-.359.123-.472.482-.472h.605c.359 0 .482.113.482.472v.605c0 .359-.123.461-.482.461h-.605zm2.932-.46c0 .358.113.46.472.46h.605c.359 0 .482-.102.482-.46v-.606c0-.359-.123-.472-.482-.472h-.605c-.359 0-.472.113-.472.472v.605zm-9.74 3.814c-.37 0-.483-.103-.483-.462v-.605c0-.359.113-.461.482-.461h.595c.37 0 .482.102.482.461v.605c0 .359-.113.462-.482.462h-.595zm2.922-.462c0 .359.123.462.482.462h.604c.36 0 .472-.103.472-.462v-.605c0-.359-.113-.461-.472-.461h-.604c-.36 0-.482.102-.482.461v.605zm3.886.462c-.36 0-.482-.103-.482-.462v-.605c0-.359.123-.461.482-.461h.605c.359 0 .482.102.482.461v.605c0 .359-.123.462-.482.462h-.605zm2.932-.462c0 .359.113.462.472.462h.605c.359 0 .482-.103.482-.462v-.605c0-.359-.123-.461-.482-.461h-.605c-.359 0-.472.102-.472.461v.605zm-9.74 3.825c-.37 0-.483-.113-.483-.472v-.605c0-.359.113-.461.482-.461h.595c.37 0 .482.102.482.461v.605c0 .359-.113.472-.482.472h-.595zm2.922-.472c0 .359.123.472.482.472h.604c.36 0 .472-.113.472-.472v-.605c0-.359-.113-.461-.472-.461h-.604c-.36 0-.482.102-.482.461v.605zm3.886.472c-.36 0-.482-.113-.482-.472v-.605c0-.359.123-.461.482-.461h.605c.359 0 .482.102.482.461v.605c0 .359-.123.472-.482.472h-.605z"
				fill="currentColor"
			/>
		</Svg>
	)
}
