package krimselis.controller;

import krimselis.dto.PostDto;
import krimselis.entity.User;
import krimselis.service.PostService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class BlogController {
    private final PostService postService;

    public BlogController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> posts = postService.findAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{postUrl}")
    public ResponseEntity<PostDto> showPost(@PathVariable("postUrl") String postUrl) {
        PostDto post = postService.findPostByUrl(postUrl);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<PostDto> searchPosts(@RequestParam(value = "query") String query) {
        return postService.searchPosts(query);
    }

    @PostMapping("/newpost")
    public ResponseEntity<Object> createNewPost(@RequestBody PostDto postDto, java.security.Principal principal, Authentication authentication, @AuthenticationPrincipal User user) {
        SecurityContextHolder.getContext().getAuthentication();
        postDto.setUrl(getUrl(postDto.getTitle()));
        postService.createPost(postDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{postId}/delete")
    public ResponseEntity<Object> deletePost(@PathVariable("postId") Long postId) {
        PostDto postDto = postService.findPostById(postId);
        if (postDto == null) {
            return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
        }
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    private static String getUrl(String postTitle) {

        String title = postTitle.trim().toLowerCase();
        String url = title.replaceAll("\\s+", "-");
        url = url.replaceAll("[^A-Za-z0-9]", "-");
        return url;
    }
}
