import { Animated, Easing } from 'react-native'
import Svg, {
	Defs,
	Path,
	RadialGradient,
	Stop,
	SvgProps,
} from 'react-native-svg'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export const LoadingIndicator = (props: SvgProps) => {
	const spinValue = new Animated.Value(0)

	Animated.loop(
		Animated.timing(spinValue, {
			toValue: 1,
			duration: 1800,
			easing: Easing.linear,
			useNativeDriver: true,
		}),
	).start()

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	})

	return (
		<AnimatedSvg
			style={{ transform: [{ rotate: spin }] }}
			width={40}
			height={40}
			fill="none"
			{...props}
		>
			<Path
				fill="url(#a)"
				fillRule="evenodd"
				d="M20 0c-.526 0-.952.498-.952 1.111v6.667c0 .613.426 1.11.952 1.11s.952-.497.952-1.11V1.11C20.952.498 20.526 0 20 0ZM6.812 5.714c-.287 0-.555.133-.77.348a1.103 1.103 0 0 0 0 1.57l4.72 4.74a1.153 1.153 0 0 0 1.609 0 1.144 1.144 0 0 0 0-1.604L7.616 6.062a1.178 1.178 0 0 0-.804-.348Zm26.376 0c-.285 0-.588.133-.804.348l-4.755 4.706a1.144 1.144 0 0 0 0 1.604 1.153 1.153 0 0 0 1.609 0l4.72-4.74a1.103 1.103 0 0 0 0-1.57c-.215-.215-.483-.348-.77-.348ZM1.111 19.048C.498 19.048 0 19.474 0 20s.498.952 1.111.952h6.667c.613 0 1.11-.426 1.11-.952s-.497-.952-1.11-.952H1.11Zm31.111 0c-.613 0-1.11.426-1.11.952s.497.952 1.11.952h6.667c.613 0 1.111-.426 1.111-.952s-.498-.952-1.111-.952h-6.667Zm-20.656 8.254c-.285 0-.587.098-.804.315l-4.72 4.763a1.112 1.112 0 0 0 0 1.577 1.107 1.107 0 0 0 1.574 0l4.755-4.729a1.154 1.154 0 0 0 0-1.611 1.136 1.136 0 0 0-.805-.315Zm16.867 0c-.284 0-.589.098-.804.315a1.154 1.154 0 0 0 0 1.611l4.755 4.73a1.107 1.107 0 0 0 1.574 0 1.112 1.112 0 0 0 0-1.578l-4.72-4.763a1.138 1.138 0 0 0-.805-.315ZM20 31.112c-.526 0-.952.497-.952 1.11v6.667c0 .613.426 1.111.952 1.111s.952-.498.952-1.111v-6.667c0-.613-.426-1.11-.952-1.11Z"
				clipRule="evenodd"
			/>
			<Defs>
				<RadialGradient
					id="a"
					cx={0.5}
					cy={0.5}
					r={0.5}
					gradientUnits="objectBoundingBox"
				>
					<Stop offset={0} stopColor="#fff" stopOpacity={1} />
					<Stop offset={1} stopColor="#000" stopOpacity={1} />
				</RadialGradient>
			</Defs>
		</AnimatedSvg>
	)
}
