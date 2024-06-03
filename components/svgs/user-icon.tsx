import Svg, { Path, SvgProps } from 'react-native-svg'

export const UserIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M12 11.32c-2.205 0-4.102-1.969-4.102-4.512 0-2.512 1.908-4.43 4.102-4.43 2.194 0 4.102 1.877 4.102 4.41 0 2.563-1.908 4.532-4.102 4.532zm-6.88 9.495c-1.098 0-1.754-.513-1.754-1.364 0-2.645 3.312-6.296 8.624-6.296 5.321 0 8.633 3.65 8.633 6.296 0 .851-.656 1.364-1.753 1.364H5.12z"
				fill="currentColor"
			/>
		</Svg>
	)
}
