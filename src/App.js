import '@fontsource/roboto';

import AskQuestion from './AskQuestion';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Trending from './Trending';
import AllQuestions from './AllQuestions';
import Home from './Home';
import Question from './Question';
import SearchUser from './SearchUser';
import SearchPost from './SearchPost';
import SearchTag from './SearchTag';
import Users from './Users';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Login from './Login';
import Server from './Server';

function App() {
  document.title = "Skill Enhancment Portal"
  return (   
    <div>
      <Router>
      <Switch>
        <Route exact path="/questions" component={AllQuestions}/>
        <Route exact path="/profile" component={Profile}/> 
        <Route exact path="/profile/edit" component={EditProfile}/> 
        <Route exact path="/users" component={Users}/>
        <Route exact path="/askquestion" component={AskQuestion}/>
        <Route exact path="/searchpost/:search_string" component={SearchPost}/>
        <Route exact path="/searchTags/:tag" component={SearchTag}/>
        <Route exact path="/searchcusts/:name" component={SearchUser}/>
        <Route exact path="/question/:q_id" component={Question}/>
        <Route exact path="/trending" component={Trending}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/server" component={Server} />
        <Route path= "/" component={Home}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;