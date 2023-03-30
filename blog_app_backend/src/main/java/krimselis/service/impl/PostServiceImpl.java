package krimselis.service.impl;

import krimselis.repository.PostRepository;
import krimselis.repository.UserRepository;
import krimselis.dto.PostDto;
import krimselis.entity.User;
import krimselis.entity.Post;
import krimselis.mapper.PostMapper;
import krimselis.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public List<PostDto> findAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(PostMapper::mapToPostDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostDto> findPostsByUser() {
//        String email = SecurityUtils.getCurrentUser().getUsername();
//        User createdBy = userRepository.findByEmail(email);
//        Long userId = createdBy.getId();
//        List<Post> posts = postRepository.findPostsByUser(userId);
//        return posts.stream()
//                .map((post) -> PostMapper.mapToPostDto(post))
//                .collect(Collectors.toList());
        return null;
    }

    @Override
    public void createPost(PostDto postDto) {

        String email = "krimselis@yahoo.com"; //TODO change this line when security is implemented
        User user = userRepository.findByEmail(email).orElse(null);
        Post post = PostMapper.mapToPost(postDto);
        post.setCreatedBy(user);
        postRepository.save(post);

    }
    @Override
    public PostDto findPostById(Long postId) {
        Post post = postRepository.findById(postId).get();
        return PostMapper.mapToPostDto(post);
    }

    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public PostDto findPostByUrl(String postUrl) {
        Post post = postRepository.findByUrl(postUrl).get();
        return PostMapper.mapToPostDto(post);
    }

    @Override
    public List<PostDto> searchPosts(String query) {
        List<Post> posts = postRepository.searchPosts(query);
        return posts.stream()
                .map(PostMapper::mapToPostDto)
                .collect(Collectors.toList());
    }

}
