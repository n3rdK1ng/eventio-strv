import Svg, { Path, SvgProps } from 'react-native-svg'

export const EventioLogo = (props: SvgProps) => (
	<Svg width={32} height={32} fill="none" {...props}>
		<Path
			fill="#323C46"
			fillRule="evenodd"
			d="M4 28V4h14.182v4.4H8.408v5.484h8.848v4.164H8.408v5.551h9.774V28H4Zm18.546-2.727c0-.76.263-1.404.79-1.933a2.61 2.61 0 0 1 1.922-.794c.377 0 .735.07 1.073.21.338.14.63.334.88.584A2.718 2.718 0 0 1 28 25.273a2.709 2.709 0 0 1-.79 1.933c-.248.25-.541.444-.88.584-.337.14-.695.21-1.072.21a2.61 2.61 0 0 1-1.923-.794 2.638 2.638 0 0 1-.79-1.933Z"
			clipRule="evenodd"
		/>
	</Svg>
)
