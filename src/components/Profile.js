import styles from '../styles/components/Profile.module.css'

export function Profile() {
	return (
		<div className={ styles.profileContainer }>
			<img src="https://github.com/BrunaSepulveda.png" alt="Bruna Sepúlveda"/>
			<div>
				<strong>Bruna Sepúlveda</strong>
				<p>
					<img src="icons/level.svg" alt="seta icone de level"/>
					Level 1
				</p>
			</div>
		</div>
	);
}