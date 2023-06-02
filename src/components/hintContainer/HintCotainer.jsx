import styles from './HintContainer.module.scss'

export const HintContainer = ({ hintTitle, hintContent, isEditable=false }) => {
    return (
        <div className={styles.hintContainer}>
            힌트영역
        </div>
    )
}