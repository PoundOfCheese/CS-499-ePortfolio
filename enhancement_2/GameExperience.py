# This class stores the episodes, all the states that come in between the initial state and the terminal state. 
# This is later used by the agent for learning by experience, called "exploration". 

import numpy as np

class GameExperience(object):
    
    # model = neural network model
    # max_memory = number of episodes to keep in memory. The oldest episode is deleted to make room for a new episode.
    # discount = discount factor; determines the importance of future rewards vs. immediate rewards
    
    def __init__(self, model, target_model, max_memory=100, discount=0.95):
        self.model = model
        self.target_model = target_model
        self.max_memory = max_memory
        self.discount = discount
        self.memory = list()
        self.num_actions = model.output_shape[-1]
    
    # Stores episodes in memory
    
    def remember(self, episode):
        # episode = [envstate, action, reward, envstate_next, game_over]
        # memory[i] = episode
        # envstate == flattened 1d maze cells info, including pirate cell (see method: observe)
        self.memory.append(episode)
        if len(self.memory) > self.max_memory:
            del self.memory[0]

    # Predicts the next action based on the current environment state        
    def predict(self, envstate):
        return self.model.predict(envstate, verbose=0)[0]

    # Returns input and targets from memory, defaults to data size of 10
    def get_data(self, data_size=10):
        env_size = self.memory[0][0].shape[1]
        mem_size = len(self.memory)
        data_size = min(mem_size, data_size)
    
        # pick indices
        idx = np.random.choice(range(mem_size), data_size, replace=False)
    
        # preallocate
        inputs = np.zeros((data_size, env_size))
        targets = np.zeros((data_size, self.num_actions))
    
        # collect envstates and next envstates in two big arrays
        envstates = np.vstack([self.memory[j][0] for j in idx])
        envstates_next = np.vstack([self.memory[j][3] for j in idx])
    
        # one big predict for all current states
        q_current = self.model.predict(envstates, verbose=0)
    
        # one big predict for all next states by both models
        q_next_main = self.model.predict(envstates_next, verbose=0)
        q_next_target = self.target_model.predict(envstates_next, verbose=0)
    
        # fill targets using these arrays
        for i, j in enumerate(idx):
            envstate, action, reward, envstate_next, game_over = self.memory[j]
            inputs[i] = envstate
            targets[i] = q_current[i]  # start from current Q-values
    
            # Double DQN next-state value
            next_action = np.argmax(q_next_main[i])
            Q_sa = q_next_target[i][next_action]
    
            if game_over:
                targets[i, action] = reward
            else:
                targets[i, action] = reward + self.discount * Q_sa
    
        return inputs, targets
