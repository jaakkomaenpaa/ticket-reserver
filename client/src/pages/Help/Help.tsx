import { useState } from 'react'
import styles from './Help.module.css'

// Instructions for app use
const Help = () => {
  const [currentPage, setCurrentPage] = useState<JSX.Element>(<GeneralInfo />)

  const pages = [
    {
      header: 'General info',
      component: <GeneralInfo />,
    },
    {
      header: 'Testing token',
      component: <TestingToken />,
    },
    {
      header: 'Required parameters',
      component: <RequiredParameters />,
    },
    {
      header: 'Optional parameters',
      component: <OptionalParameters />,
    },
    {
      header: 'Default behavior',
      component: <DefaultBehavior />,
    },
    {
      header: 'Finally',
      component: <Finally />,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.header}>Instructions</h2>
        <nav className={styles.navbar}>
          {pages.map(page => (
            <NavLink
              key={page.header}
              label={page.header}
              isActive={page.component.type === currentPage.type}
              callback={() => setCurrentPage(page.component)}
            />
          ))}
        </nav>
        {currentPage}
      </div>
    </div>
  )
}

interface NavLinkProps {
  label: string
  isActive: boolean
  callback: () => void
}

const NavLink = ({ label, isActive, callback }: NavLinkProps) => {
  return (
    <button
      className={isActive ? styles.linkActive : styles.link}
      onClick={() => {
        callback()
      }}
    >
      {label}
    </button>
  )
}

const GeneralInfo = () => {
  return (
    <div className={styles.pageContent}>
      <h4>General info</h4>
      <p>An access code is required for reserving tickets.</p>
      <p>
        Every now and then, Kide.app change a certain parameter needed in the
        reservation process. Because of this, it is recommended to test the bot on
        some event whose sales have already started (or use the token test). If it
        works, the bot should also work for the actual event you want to reserve
        tickets for. In case it doesn't work, the author most likely has to manually
        change the parameter before the reserver works again.
      </p>
      <p>
        Note that whenever you log in to your Kide.app account, a new Bearer token is
        generated for you. However, the old one will also still work for some amount
        of time (24h?). Thus, it is recommended to update your token whenever creating
        a new login.
      </p>
    </div>
  )
}

const TestingToken = () => {
  return (
    <div className={styles.pageContent}>
      <h4>Testing bearer token</h4>
      <p>
        Above, you have the opportunity to test if your bearer token is valid or not.
        After pressing the button, the validity is shown below it. If the token is
        valid, it gets saved to the local storage and automatically added to the
        reservation form. This way the user needs to fetch it from Kide.app only when
        the test results as invalid.
      </p>
      <p>
        The test also shows its own validity. If the status is shown as invalid, the
        test does not work. Whenever the test is valid, the latest date when the
        specific test can be used is shown. However, the test can also expire before
        the shown date. When the test expires, it needs to be updated by the author.
      </p>
    </div>
  )
}

const RequiredParameters = () => {
  return (
    <div className={styles.pageContent}>
      <h4>Required form parameters</h4>
      <p>
        In the Event url field, paste the url address of the event. This can also be
        done by clicking on an event in the find events section.
      </p>
      <p>
        The Bearer token field requires your Kide.app authorization token, which can
        be found anywhere from the Kide.app website by:{' '}
        <strong>
          *right-click &rarr; Inspect &rarr; Application &rarr; Local Storage &rarr;
          authorization.token.{' '}
        </strong>
        Make sure to copy the whole token (it is long) and paste it without the
        quotation marks and the warning text.
      </p>
    </div>
  )
}

const OptionalParameters = () => {
  return (
    <div className={styles.pageContent}>
      <h4>Optional form parameters</h4>
      <p>
        There are two optional fields: ticket index and keyword. Ticket index refers
        to the position of the ticket type counted from top to bottom. For example,
        number 1 corresponds to the ticket which is displayed at the top etc. If you
        choose to select a ticket index and it exists, the bot will prioritize that
        ticket variant.
      </p>
      <p>
        If you select a keyword, the bot will prioritize those ticket types that have
        that word on their title. Both ticket index and keyword parameters work as
        follows: if they are left empty, are invalid or don't match any ticket
        variants, the reserver works as default (described below). If both are given,
        the keyword is taken into account first.
      </p>
    </div>
  )
}

const DefaultBehavior = () => {
  return (
    <div className={styles.pageContent}>
      <h4>Default behavior</h4>
      <p>
        After passing the required info, press 'Submit' and the reserver should start
        working. The status messages of the reservation will be shown during the
        process.
      </p>
      <p>
        The bot will try to reserve the maximum possible amount of each ticket type
        (even if you gave an index and/or a keyword), but it is currently capped at 10
        tickets per type. The tickets will appear in your Kide.app shopping cart after
        a successful response (sometimes even after an unsuccessful response, so you
        should check the cart anyways).
      </p>
    </div>
  )
}

const Finally = () => {
  return (
    <div className={styles.pageContent}>
      <h4>Finally</h4>
      <p>
        If you have any questions, find any problems, or have some improvement ideas,
        hit me up in Telegram @jaakkomaenpaa
      </p>
    </div>
  )
}

export default Help
